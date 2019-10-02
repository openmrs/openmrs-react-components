import React from 'react';
import LocalizedMessage from "../../../components/localization/LocalizedMessage";
import formValidations from "../validations.jsx";

const localizedErrorMessage = <LocalizedMessage defaultMessage="Decimals not allowed" id="reactcomponents.value.disallow.decimals"/>;

describe('Validation functions', () => {

  it('disallowDecimals when input value has decimals', () => {

    expect(formValidations.disallowDecimals()("10.6")).toEqual(localizedErrorMessage);
  });

  it('disallowDecimals when input value has spaces in the middle', () => {

    expect(formValidations.disallowDecimals()("9  6")).toEqual(localizedErrorMessage);
  });

  it('disallowDecimals when input value ends with comma', () => {

    expect(formValidations.disallowDecimals()("956.")).toEqual(localizedErrorMessage);
  });

  it('disallowDecimals when input value contains non digit characters', () => {

    expect(formValidations.disallowDecimals()("9_xxR_6")).toEqual(localizedErrorMessage);
  });

  it('allowDecimals when input value is 0', () => {

    expect(formValidations.disallowDecimals()("0")).toEqual(undefined);
  });

  it('allowDecimals when input value is an integer', () => {

    expect(formValidations.disallowDecimals()("323")).toEqual(undefined);
  });
});
