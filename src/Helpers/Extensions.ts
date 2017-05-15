interface Array<T> {
    first(): T;
    second(): T;
    last(): T;
    secondLast(): T;
    remove(obj: T): void;
    shuffle(random: Random): Array<T>;
    pickRandom(random: Random): T;
    contains(needle: T): boolean;
    onlyOdd(): Array<T>;
    onlyEven(): Array<T>;
    insert(obj: Object, index: number): Array<T>;
}
interface Object {
    clone(): any;
}
interface String {
    repeat(times: number): string;
}

// Array extensions
Array.prototype.first = function() {
    if (this.length) {
        return this[0];
    }
    else {
        return null;
    }
};
Array.prototype.second = function() {
    if (this.length > 1) {
        return this[1];
    }
    else {
        return null;
    }
};

Array.prototype.last = function() {
    if (this.length) {
        return this[this.length - 1];
    }
    else {
        return null;
    }
};

Array.prototype.secondLast = function() {
    if (this.length > 1) {
        return this[this.length - 2];
    }
    else {
        return null;
    }
};

Array.prototype.remove = function(obj) {
    var index = this.indexOf(obj);
    if (index > -1) {
        return this.splice(index, 1);
    }
    else {
        return this;
    }
};


Array.prototype.shuffle = function(random: Random) {
    var a = this;
    for (let i = a.length; i; i--) {
        let j = Math.floor(random.go() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
};

Array.prototype.pickRandom = function(random) {
    return this[random.next(0, this.length - 1)];
};

Array.prototype.contains = function(needle) {
    return this.indexOf(needle) > -1;
};

Array.prototype.onlyOdd = function() {
    return this.filter(Numbers.isOdd);
};

Array.prototype.onlyEven = function() {
    return this.filter(Numbers.isEven);
};

Array.prototype.insert = function(obj, index) {
    return this.splice(index, 0, obj);
};

Object.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
};

String.prototype.repeat = function(times) {
    return (new Array(times + 1)).join(this);
};
