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
    whereNotNull(): Array<T>;
    where(condition): Array<T>;
    select(what): Array<any>;
    not(object: any): Array<any>;
    sum(): number;
    average(): number;
    any(): boolean;
}
interface Object {
    clone(): any;
}
interface String {
    repeat(times: number): string;
    padLeft(char: string, maxLength: number): string;
    padRight(char: string, maxLength: number): string;
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

Array.prototype.whereNotNull = function() {
    return this.filter((val) => { return val !== null });
};


// LINQ-esque extensions
Array.prototype.where = function(condition) {
    return this.filter(condition);
};

Array.prototype.select = function(attributes) {
    return this.map(attributes);
};

Array.prototype.sum = function(): number {
    return this.reduce((a, b) => a + b, 0);
};

Array.prototype.average = function(): number {
    return this.sum() / this.length;
};

Array.prototype.any = function(): boolean {
    return this.length > 0;
}

Array.prototype.not = function(object) {
    return this.filter((thing) => { return thing != object });
}


// Object extensions

Object.prototype.clone = function() {
    return JSON.parse(JSON.stringify(this));
};


// String extensions

String.prototype.repeat = function(times) {
    return (new Array(times + 1)).join(this);
};

String.prototype.padLeft = function(char: string, maxLength: number): string {
    return char.repeat(maxLength - this.length) + this;
}

String.prototype.padRight = function(char: string, maxLength: number): string {
    return this + char.repeat(maxLength - this.length);
}
