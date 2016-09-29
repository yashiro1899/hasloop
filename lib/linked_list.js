function Node(element) {
    "use strict";
    this.element = element;
    this.next = null;
}

function LList() {
    "use strict";
    this.head = null;
    this.append = function (item) {
        let node = new Node(item);
        let tail = this.head;

        node.next = null;
        if (tail === null) {
            this.head = node;
            return node;
        }

        while (tail.next !== null) {
            tail = tail.next;
        }
        tail.next = node;

        return node;
    };
}

module.exports = LList;
