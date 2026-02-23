"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OperatorMock", {
    enumerable: true,
    get: function() {
        return OperatorMock;
    }
});
function OperatorMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'OPERATOR_ID',
        name: (options == null ? void 0 : options.name) || 'OPERATOR_NAME',
        code: (options == null ? void 0 : options.code) || 'OPERATOR_CODE',
        type: (options == null ? void 0 : options.type) || 'PROTOCOL',
        rating: options == null ? void 0 : options.rating,
        location: options == null ? void 0 : options.location,
        createdAt: (options == null ? void 0 : options.createdAt) || now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: (options == null ? void 0 : options.updatedAt) || now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=operator.mock.js.map