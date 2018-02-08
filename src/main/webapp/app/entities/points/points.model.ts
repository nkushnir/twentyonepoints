import { BaseEntity, User } from './../../shared';

export class Points implements BaseEntity {
    constructor(
        public id?: number,
        public timestamp?: any,
        public exercise?: number,
        public meals?: number,
        public alcohol?: number,
        public notes?: string,
        public user?: User,
    ) {
    }
}
