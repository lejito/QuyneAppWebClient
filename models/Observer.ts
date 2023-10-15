export interface Observer {
    id: number;
    value: any;
    update(subject: Subject): void;
}



export interface Subject {
    value: any;
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    cleanObservers(): void;
    notifyObservers(): void;
}

