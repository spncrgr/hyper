const {readFileSync} = require('fs');
const {defaultPlatformKeyPath} = require('./paths');

const commands = {};
const keys = {};

const _setKeysForCommands = function (keymap) {
  for (const command in keymap) {
    if (command) {
      commands[command] = keymap[command].toLowerCase();
    }
  }
};

const _setCommandsForKeys = function (commands) {
  for (const command in commands) {
    if (command) {
      keys[commands[command]] = command;
    }
  }
};

const _import = function (customsKeys) {
  try {
    const mapping = JSON.parse(readFileSync(defaultPlatformKeyPath()));
    _setKeysForCommands(mapping);
    _setKeysForCommands(customsKeys);
    _setCommandsForKeys(commands);

    return {commands, keys};
  } catch (err) {}
};

const _extend = function (customsKeys) {
  if (customsKeys) {
    for (const command in customsKeys) {
      if (command) {
        commands[command] = customsKeys[command];
        keys[customsKeys[command]] = command;
      }
    }
  }
  return {commands, keys};
};

module.exports = {
  import: _import,
  extend: _extend
};
