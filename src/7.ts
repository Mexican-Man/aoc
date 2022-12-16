export { };

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

class Command {
    private _pwd: string;
    private _cmd: Array<string>;
    private _out: string;

    constructor(pwd: string, input: string, output: string) {
        this._pwd = pwd;
        this._cmd = input.trim().split(' ');
        this._out = output;
    }

    exec(): Dir | void {
        switch (this._cmd[0]) {
            case 'cd':
                switch (this._cmd[1]) {
                    case '/':
                        this._pwd = '/';
                        break;
                    case '.':
                        break;
                    case '..':
                        this._pwd = this._pwd.split('/').slice(0, -1).join('/');
                        break;
                    default:
                        this._pwd = this._pwd + (this._pwd === '/' ? '' : '/') + this._cmd[1];
                        break;
                }
                break;
            case 'ls':
                return new Dir(this._pwd.split('/').pop() || '/', this._out.split('\n'));
        }
    }

    get pwd(): string {
        return this._pwd;
    }
}

class File {
    readonly name: string;
    readonly size: number;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }
}

class Dir {
    readonly name: string;
    readonly files: Array<File | Dir>;

    constructor(name: string, files: Array<string>) {
        this.name = name;
        this.files = new Array<File | Dir>();
        files.forEach((file) => {
            const [size, name] = file.split(' ');
            if (size.startsWith('dir')) {
                this.files.push(new Dir(name, []));
            } else {
                this.files.push(new File(name, parseInt(size)));
            }
        });
    }

    size(): number {
        return this.files.reduce((acc, file) => acc + (file instanceof File ? file.size : file.size()), 0);
    }

    findMax(size: number): Array<Dir> {
        const max = new Array<Dir>();
        if (this.size() < size) {
            max.push(this);
        }
        this.files.forEach((file) => {
            if (file instanceof Dir) {
                max.push(...file.findMax(size));
            }
        });
        return max;
    }

    findMin(size: number): Dir | null {
        let min: Dir | null = null;
        if (this.size() >= size) {
            min = this;
        }

        min = this.files.reduce((acc, file) => {
            if (file instanceof Dir) {
                const childMin = file.findMin(size);
                if (childMin && childMin.size() >= size) {
                    if (!acc || childMin.size() < acc.size()) {
                        return childMin;
                    }
                }
            }
            return acc;
        }, min);

        return min;
    }
}

class OS {
    readonly root: Dir;
    private _pwd: string;

    constructor(commands: Array<Array<string>>) {
        this.root = new Dir('/', []);
        this._pwd = '/';

        for (const command of commands.slice(1)) {
            const cmd = new Command(this._pwd, command[0], command.slice(1).join('\n'));
            const res = cmd.exec();
            if (!res) {
                this._pwd = cmd.pwd;
            }

            const dirs = cmd.pwd.split('/');
            dirs[0] = '/'; // [ '', 'a', 'b', 'c' ] -> [ '/', 'a', 'b', 'c' ]

            // Remove trailing slash
            if (dirs[dirs.length - 1] === '') {
                dirs.pop();
            }

            // Traverse to the directory
            let dir = this.root;

            // A bit janky, but we're already inside /, so looking for / doesn't make sense
            if (dirs.length > 1) {
                for (const d of dirs.slice(1)) { // Again, skip /, we're already there
                    dir = dir.files.find((file) => file instanceof Dir && file.name === d) as Dir;
                }
            }

            // Add the file or directory
            // Because cmd.exec() returns the Dir itself, rather than Array<File | Dir>, we need to object.assign it
            if (res instanceof Dir) {
                Object.assign(dir, res);
            }
        }
    }
}

const splitInput = input
    .split('$')
    .map((io) => io
        .trim()
        .split('\n'));

const os = new OS(splitInput);

console.log(`Part 1: ${os.root.findMax(100000).reduce((acc, dir) => acc + dir.size(), 0)}, Part 2: ${os.root.findMin(30000000 - (70000000 - os.root.size()))!.size()}`);