export enum RolesEnum {
    'manager' = 'manager',
    'driver' = 'driver',
    'admin' = 'admin',
}

export enum ProductEnum {
    'maxWeight' = 50000
}

export enum CarConditionEnum {
    'ready' = 'ready',
    'slightlyDamaged' = 'slightlyDamaged',
    'notReady' = 'notReady'
}

export enum ErrorsEnum {
    'exist' = 'User already exist',
    'userNotFound' = 'User not found',
    'incorrectEmail' = 'Enter correct email',
    'incorrectPassword' = 'Incorrect password',
    'notEnoughRights' = 'Not enough rights',
    'storageNotFound' = 'Storage not found',
    'setRightCapacity' = 'Please set capacity no less than 100',
}

export enum CarStatusEnum {
    'atStorage' = 'atStorage',
    'onRoad' = 'onRoad',
}

export enum ShippingStatusEnum {
    'planned' = 'planned',
    'sent' = 'sent',
    'delivered' = 'delivered'
}