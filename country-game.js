import React from "react";

export default function CountryCapitalGame({ data }) {
    const [pairs, setPairs] = React.useState([]);
    const [places, setPlaces] = React.useState([]);
    const [selectedPlaces, setSelectedPlaces] = React.useState([]);

    const showCongratulations = places.length === 0 && pairs.length > 0
    const containPlaces = places.length > 0

    const verifyIsPair = (selectedPlaces) => {
        const [firstElement, secondElement] = selectedPlaces;
        const [foundPair] = pairs.filter(
            (pair) =>
                (pair.country === firstElement && pair.capital === secondElement) ||
                (pair.country === secondElement && pair.capital === firstElement)
        );

        return !!foundPair;
    };

    const getInitialData = () => {
        const places = [];
        const pairs = [];

        Object.keys(data).forEach((place) => {
            pairs.push({ country: place, capital: data[place] });
            places.push(place);
            places.push(data[place])
        });

        places.sort(() => Math.random() > 0.5 ? 1 : -1)

        setPairs(pairs);
        setPlaces(places)
    };

    React.useEffect(() => {
        getInitialData();
    }, []);

    const removePlacesFromShownPlaces = (selectedPlaces) => {
        const [firstElement, secondElement] = selectedPlaces;
        const newPlaces = places.filter(place => place !== firstElement && place !== secondElement)
        setPlaces(newPlaces)
    }

    const markPlacesWrong = (selectedPlaces) => {
        selectedPlaces.forEach(place => document.getElementById(place).classList.remove("button-correct"))
        selectedPlaces.forEach(place => document.getElementById(place).classList.add("button-wrong"))
    }

    const removeMarks = (selectedPlaces) => {
        selectedPlaces.forEach(place => document.getElementById(place).classList.remove("button-correct"))
        selectedPlaces.forEach(place => document.getElementById(place).classList.remove("button-wrong"))
    }

    const markPlaceRight = (place) => {
        document.getElementById(place).classList.add("button-correct")
    }

    const selectPlace = (selected) => () => {
        const selectedPlacesEmpty = selectedPlaces.length === 0
        const selectedPlacesNotEmpty = selectedPlaces.length === 1
        const selectedPlacesFull = selectedPlaces.length === 2
        const elementSelected = selectedPlaces.includes(selected)

        if (elementSelected && selectedPlacesFull) {
            removeMarks(selectedPlaces)
            markPlaceRight(selected)
            setSelectedPlaces([selected])
            return;
        }

        if (elementSelected) {
            return;
        }

        if (selectedPlacesEmpty | selectedPlacesFull) {
            removeMarks(selectedPlaces)
            markPlaceRight(selected)
            setSelectedPlaces([selected])
        }
        else if (selectedPlacesNotEmpty) {
            const newSelectedPlaces = [...selectedPlaces, selected]

            const isPair = verifyIsPair(newSelectedPlaces)
            if (isPair) {
                removePlacesFromShownPlaces(newSelectedPlaces)
                setSelectedPlaces([])
            }
            else {
                markPlacesWrong(newSelectedPlaces)
                setSelectedPlaces(newSelectedPlaces)
            }
        }
    }

    return (
        <div>
            {showCongratulations && <span>Congratulations</span>}

            {places.map((place) => {
                return <button className='button' id={place} key={place} onClick={selectPlace(place)}>{place}</button>
            })}

            {containPlaces && <style>
                {`
                    .button {
                        margin: 4px 0 0 4px;
                    }

                    .button-correct {
                        background-color: #0000ff;
                    }

                    .button-wrong {
                        background-color: #ff0000;
                    }
                `}
            </style>}
        </div >
    );
}
