module.exports = {
  verbose: true,
  roots: ['<rootDir>'],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/test/mocks/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
