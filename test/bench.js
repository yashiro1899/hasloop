const Benchmark = require("benchmark");
const head_G4 = require("./G4"); // with loop
const head_G30 = require("./G30"); // without loop
const head_G98 = require("./G98"); // with full loop where the last node links to the first

var suite = new Benchmark.Suite();

suite.add("Mark Each Node\n\t", function () {
        "use strict";

        function hasloop(head) {
            var current = head;
            do {
                if (current.seen) {
                    return true;
                }
                current.seen = true;
                current = current.next;
            } while (current);
            return false;
        }
        hasloop(head_G4());
        hasloop(head_G30());
        hasloop(head_G98());
    })
    .add("Keep a hash set of all nodes seen so far\n\t", function () {
        "use strict";

        function hasloop(head) {
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
        }
        hasloop(head_G4());
        hasloop(head_G30());
        hasloop(head_G98());
    })
    .add("Use a doubly linked list\n\t", function () {
        "use strict";

        function hasloop(head) {
            var current = head;
            var previous = null;
            do {
                if (previous && current.previous !== undefined && previous !== current.previous) {
                    return true;
                }
                if (current.previous === undefined) {
                    current.previous = previous;
                }
                previous = current;
                current = current.next;
            } while (current);
            return false;
        }
        hasloop(head_G4());
        hasloop(head_G30());
        hasloop(head_G98());
    })
    .add("Check the Entire List So Far\n\t", function () {
        "use strict";

        function hasloop(head) {
            var current = head.next;
            var i = 0;
            var check;
            var j;
            do {
                check = head;
                j = 0;
                do {
                    if (check === current) {
                        return true;
                    }
                    j += 1;
                    check = check.next;
                } while (j < i && check);
                i += 1;
                current = current.next;
            } while (current);
            return false;
        }
        hasloop(head_G4());
        hasloop(head_G30());
        hasloop(head_G98());
    })
    .add("Reverse the list\n\t", function () {
        "use strict";

        function hasloop(head) {
            var previous = null;
            var current = head;
            var next;

            if (!current.next) {
                return false;
            }
            while (current) {
                next = current.next;
                current.next = previous;
                previous = current;
                current = next;
            }
            return (previous === head);
        }
        hasloop(head_G4());
        hasloop(head_G30());
        hasloop(head_G98());
    })
    .add("Catch Larger and Larger Loops\n\t", function () {
        "use strict";

        function hasloop(head) {
            var current = head;
            var check = null;
            var since = 0;
            var sinceScale = 2;
            do {
                if (check === current) {
                    return true;
                }
                if (since >= sinceScale) {
                    check = current;
                    since = 0;
                    sinceScale *= 2;
                }
                since += 1;
                current = current.next;
            } while (current);
            return false;
        }
        hasloop(head_G4());
        hasloop(head_G30());
        hasloop(head_G98());
    })
    .add("Catch Loops in Two Passes\n\t", function () {
        "use strict";

        function hasloop(head) {
            var slow = head;
            var fast1 = head;
            var fast2 = head;

            do {
                fast1 = fast2 && fast2.next;
                fast2 = fast1 && fast1.next;
                if (slow === fast1 || slow === fast2) {
                    return true;
                }
                slow = slow.next;
            } while (slow && fast1 && fast2);
            return false;
        }
        hasloop(head_G4());
        hasloop(head_G30());
        hasloop(head_G98());
    })
    .on("cycle", function (event) {
        "use strict";
        console.log(String(event.target));
    })
    .on("complete", function () {
        "use strict";
        var fastest = this.filter("fastest")
            .map("name");
        console.log();
        console.log(`Fastest is ${fastest}`);
    })
    .run({async: true});
