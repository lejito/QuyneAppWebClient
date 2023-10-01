export class User {
    constructor(
        public id: number,
        public email: string,
        public docType: string,
        public document: string,
        public birthDay: Date,
        public password: string,
        private creationDate: number,
        public firstName: string,
        public firstLastName: string,
        public secondLastName?: string,
        public secondName?: string,
    ) { }
}