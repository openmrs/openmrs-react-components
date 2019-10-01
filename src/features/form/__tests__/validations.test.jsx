import formValidations from "../validations.jsx";

describe('Validation functions', () => {

  it('disallowDecimals when input value has decimals', () => {

    expect(formValidations.disallowDecimals()("10.6")).toEqual('Decimals not allowed');
  });

  it('disallowDecimals when input value has spaces in the middle', () => {

    expect(formValidations.disallowDecimals()("9  6")).toEqual('Decimals not allowed');
  });

  it('disallowDecimals when input value ends with comma', () => {

    expect(formValidations.disallowDecimals()("956.")).toEqual('Decimals not allowed');
  });

  it('disallowDecimals when input value contains non digit characters', () => {

    expect(formValidations.disallowDecimals()("9_xxR_6")).toEqual('Decimals not allowed');
  });

  it('allowDecimals when input value is an integer', () => {

    expect(formValidations.disallowDecimals()("323")).toEqual(undefined);
  });
});
