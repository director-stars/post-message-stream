"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidStreamMessage = exports.DEDICATED_WORKER_NAME = void 0;
exports.DEDICATED_WORKER_NAME = 'dedicatedWorker';
/**
 * Checks whether the specified stream event message is valid per the
 * expectations of this library.
 *
 * @param message - The stream event message property.
 * @returns Whether the `message` is a valid stream message.
 */
function isValidStreamMessage(message) {
    return ((Boolean(message) && typeof message === 'object' && !Array.isArray(message)) &&
        Boolean(message.data) &&
        (typeof message.data === 'number' ||
            typeof message.data === 'object' ||
            typeof message.data === 'string'));
}
exports.isValidStreamMessage = isValidStreamMessage;
//# sourceMappingURL=utils.js.map