const G4 = require('./G4'); // a linked list with loop
const G30 = require('./G30'); // a linked list without loop
var hasloop;

/**
 * Mark Each Node
 *
 * Traverse the list and mark each node as having been seen.
 * If you come to a node that has already been marked, then you know that the list has a loop.
 * The problem with this solution is that all nodes' `seen` properties are set to true.
 */
describe('Mark Each Node', function () {
    before(function () {
        hasloop = function (head) {
            var current = head;
            do {
                if (current.seen) {
                    return true;
                }
                current.seen = true;
                current = current.next;
            } while (current);
            return false;
        };
    });
    it('should return true when input is G4', function () {
        hasloop(G4.head)
            .should.be.equal(true);
    });
    it('should return false when input is G30', function () {
        hasloop(G30.head)
            .should.be.equal(false);
    });
});

/**
 * Keep a hash set of all nodes seen so far
 *
 * O(n) time complexity, O(n) space complexity
 *
 * Keeping a set of all the nodes have seen so far and testing to see if the next node is in that set would be a perfectly correct solution. It would run fast as well. However it would use enough extra space to make a copy of the linked list. Allocating that much memory is prohibitively expensive for large lists.
 */
describe('Keep a hash set of all nodes seen so far', function () {
    before(function () {
        hasloop = function (head) {
            var nodes = new Set();
            var current = head;

            do {
                if (nodes.has(current)) {
                    return true;
                }
                nodes.add(current);
                current = current.next;
            } while (current);
            return false;
        };
    });
    it('should return true when input is G4', function () {
        hasloop(G4.head)
            .should.be.equal(true);
    });
    it('should return false when input is G30', function () {
        hasloop(G30.head)
            .should.be.equal(false);
    });
});
