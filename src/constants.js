
// TODO this should be replaced with a configurable property!
export const DATE_FORMAT = "DD MMM YYYY";

export const LOCATION_TYPES = {
  'UnknownLocation': {
    uuid: '8d6c993e-c2cc-11de-8d13-0010c6dffd0f'
  }
};

// Any date observation that needs to be handled like a datetime by REST when submitting should be added here
// Ideally we wouldn't have this, and would just go based on the concept metadata, but that would require a greater
// amount of refactoring than we want to do in this deprecated codebase.  If this becomse active again, we can revisit
export const DATETIME_CONCEPTS = [
  "6234d61b-4c77-4af6-9bbb-533e44c03f24" // Date specimen received at laboratory
]
