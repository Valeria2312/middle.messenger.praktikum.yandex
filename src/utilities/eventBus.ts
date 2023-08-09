// class EventBus {
//     protected listeners: Record<string, ((...args: unknown[]) => void)[]>;
//
//     constructor() {
//         this.listeners = {};
//     }
//
//     on(event: string, callback: () => void): void {
//         if (!this.listeners[event]) {
//             this.listeners[event] = [];
//         }
//
//         this.listeners[event].push(callback);
//     }
//
//     off(event: string, callback: () => void): void {
//         if (!this.listeners[event]) {
//             throw new Error(`Нет события: ${event}`);
//         }
//
//         this.listeners[event] = this.listeners[event].filter(
//             (listener) => listener !== callback,
//         );
//     }
//
//     emit(event: string, ...args:any) {
//         console.log(event);
//         console.log(this.listeners);
//         console.log(args);
//         if (!this.listeners[event]) {
//             throw new Error(`Нет события: ${event}`);
//         }
//
//         this.listeners[event].forEach((listener) => {
//             listener(...args);
//         });
//     }
// }

export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, any[]>,
  > {
    public listeners: { [key in E]?: Listener<M[E]>[] } = {};

    on(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

    this.listeners[event]!.push(callback);
    }

    off(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event]!.filter(
            (listener) => listener !== callback,
        );
    }

    emit(event: E, ...args: M[E]) {
        if (!this.listeners[event]) {
            return;
            throw new Error(`Нет события: ${event}`);
        }

    this.listeners[event]!.forEach(function (listener) {
        listener(...args);
    });
    }
}


export default EventBus;
