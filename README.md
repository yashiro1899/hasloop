# Finding a Loop in a Singly Linked List

A singly linked list is made of nodes where each node has a pointer to the next node (or null to end the list). A singly linked list is often used as a stack (or last in first out queue (LIFO)) because adding a new first element, removing the existing first element, and examining the first element are very fast O(1) operations.

When working with singly linked list, you are typically given a link to the first node. Common operations on a singly linked list are iterating through all the nodes, adding to the list, or deleting from the list. Algorithms for these operations generally require a well formed linked list. That is a linked list without loops or cycles in it.


If a linked list has a cycle:

* The malformed linked list has no end (no node ever has a `null` next node pointer)
* The malformed linked list contains two links to some node
* Iterating through the malformed linked list will yield all nodes in the loop multiple times


A malformed linked list with a loop causes iteration over the list to fail because the iteration will never reach the end of the list. Therefore, it is desirable to be able to detect that a linked list is malformed before trying an iteration. This repository is some of various algorithms to detect a loop in a singly linked list.
