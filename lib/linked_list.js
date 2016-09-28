'use strict';

function Node(element) {
    this.element = element;
    this.next = null;
}


function LList() {
    this.head = new Node('head');
    this.append = function (item) {
        let node = new Node(item);
        let tail = this.head;

        while (tail.next !== null) {
            tail = tail.next;
        }

        tail.next = node;
        node.next = null;
        return node;
    };
}


module.exports = LList;
