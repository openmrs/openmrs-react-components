
const someGlobalProperty = {
  property: "someModule.someGlobalProperty",
  value: "some_value"
};

const anotherGlobalProperty = {
  property: "someModule.someGlobalProperty",
  value: "another_value"
};

const api = {
  getGlobalProperty: (globalProperty) =>  {
    if (globalProperty === someGlobalProperty.property) {
      return someGlobalProperty;
    }
    else if (globalProperty === anotherGlobalProperty.property) {
      return anotherGlobalProperty;
    }
    else {
      return null;
    }
  }
};

export default api;
