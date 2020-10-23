/**
 * 实现 Observer 接口并且继承 Subscription 类，Observer 是消费 Observable 值的公有 API
 * 所有 Observers 都转化成了 Subscriber，以便提供类似 Subscription 的能力，比如 unsubscribe
 */
export class Subscriber {
    isStopped = false;
    destination;

    constructor(observerOrNext, error, complete) {
        if (observerOrNext && typeof observerOrNext === "object") {
            this.destination = observerOrNext;
        } else {
            this.destination = {
              ...observerOrNext && { next: observerOrNext },
              ...error && { error },
              ...complete && { complete }
            }
        }
    }

    unsubscribe() {
        if (this.closed) {
            return;
        }

        this.isStopped = true;
        super.unsubscribe();
    }

    next(value) {
        if (!this.isStopped && this.destination.next) {
            this.destination.next(value);
        }
    }

    error(err) {
        if (!this.isStopped && this.destination.error) {
            this.isStopped = true;
            this.destination.error(err);
        }
    }

    complete(result) {
        if (!this.isStopped && this.destination.complete) {
            this.isStopped = true;
            this.destination.complete(result);
        }
    }
}
/** 可观察对象，当前的上传事件的集合 */
export class Observable {
    constructor(_subscribe) {
        this._subscribe = _subscribe;
    }
    subscribe(observerOrNext, error, complete) {
        let sink = new Subscriber(observerOrNext, error, complete);
        sink = this._subscribe(sink);
        return sink;
    }
}
