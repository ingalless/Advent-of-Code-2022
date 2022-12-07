import fs from 'fs'

const input = fs.readFileSync('day7.txt', { encoding: 'utf8' }).split('\n')
input.shift();

class Directory {
    value = 0;
    directories = new Map();
    prev = null;
    name = '';
    constructor(name) {
        this.name = name;
    }
}



function partOne() {
    const maxSize = 100000;
    let visited = new Set();
    let total = 0;

    /**
     * @param {Directory} dir
     */
    function walk(dir) {
        const key = `${dir.value}.${dir.name}`
        if (visited.has(key)) {
            return;
        }

        visited.add(key)
        if (dir.value <= maxSize) {
            total += dir.value;
        }
        for (const d of dir.directories.values()) {
            walk(d, dir.name)
        }
    }
    let cd = new Directory('/');
    const head = cd;

    for (const line of input) {
        if (line.charAt(0) === '$') {
            const [command, arg = null] = line.slice(2, line.length).split(' ')
            if (command === 'ls') {
                continue
            } else if (command === 'cd' && arg === '..') {
                cd = cd.prev;
            } else if (command === 'cd') {
                const old = cd;
                cd = cd.directories.get(arg)
                cd.prev = old
            }
            // handle ls output
        } else {
            const [sizeOrDir, name] = line.split(' ');
            if (sizeOrDir === 'dir') {
                if (cd.directories.has(name)) {
                    continue;
                }
                cd.directories.set(name, new Directory(name));
            } else {
                cd.value += Number(sizeOrDir);
                let cdToLoop = cd;
                while (cdToLoop.prev !== null) {
                    cdToLoop.prev.value += Number(sizeOrDir)
                    cdToLoop = cdToLoop.prev;
                }
            }
        }
    }

    walk(head);
    return total;
}

function partTwo() {
    const target = 30000000;
    let visited = new Set();
    let candidates = [];
    let cd = new Directory('/');
    const head = cd;

    /**
     * @param {Directory} dir
     */
    function walk(dir) {
        const key = `${dir.name}.${dir.value}`
        if (visited.has(key)) {
            return;
        }

        visited.add(key)
        const availableSpace = 70000000 - head.value
        const afterDeletion = availableSpace + dir.value
        if (afterDeletion >= target) {
            candidates.push(dir.value)
        }
        for (const d of dir.directories.values()) {
            walk(d, dir.name)
        }
    }

    for (const line of input) {
        if (line.charAt(0) === '$') {
            const [command, arg = null] = line.slice(2, line.length).split(' ')
            if (command === 'ls') {
                continue
            } else if (command === 'cd' && arg === '..') {
                cd = cd.prev;
            } else if (command === 'cd') {
                const old = cd;
                cd = cd.directories.get(arg)
                cd.prev = old
            }
            // handle ls output
        } else {
            const [sizeOrDir, name] = line.split(' ');
            if (sizeOrDir === 'dir') {
                if (cd.directories.has(name)) {
                    continue;
                }
                cd.directories.set(name, new Directory(name));
            } else {
                cd.value += Number(sizeOrDir);
                let cdToLoop = cd;
                while (cdToLoop.prev !== null) {
                    cdToLoop.prev.value += Number(sizeOrDir)
                    cdToLoop = cdToLoop.prev;
                }
            }
        }
    }

    walk(head);
    const lowest = candidates.sort((a, b) => a - b).shift();
    return lowest;
}

console.log('Part 1:', partOne())
console.log('Part 2:', partTwo())
