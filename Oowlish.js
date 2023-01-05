function dedupe(list) {
  var map = new Map();

  list.map((item) => {
    const existentData = map.get(item.id);

    if (existentData) {
      map.set(item.id, { ...item, ...existentData });
    } else {
      map.set(item.id, item);
    }
  });

  return Array.from(map.values());
}

module.exports = dedupe;

function denormalize({ primary, related, relatedName, referenceId }) {
  return primary.map((customer) => {
    const order = related.filter((order) => customer.id === order[referenceId]);
    return { ...customer, [relatedName]: order };
  });
}

denormalize({
  primary: [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Richard Roe" },
  ],
  related: [
    { id: 1, customerId: 1, product: "M1 MacBook Air", price: 999 },
    { id: 2, customerId: 2, product: "M1 MacBook Pro", price: 1299 },
    { id: 3, customerId: 1, product: "Dell XPS 9310", price: 1199 },
  ],
  relatedName: "orders",
  referenceId: "customerId",
});

module.exports = denormalize;
