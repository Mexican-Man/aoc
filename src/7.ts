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
                return new Dir(this._pwd, this._out.split('\n'));
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
        return this.files.reduce((acc, file) => file instanceof File ? acc + file.size : file.size(), 0);
    }
}

class OS {
    readonly root: Dir;
    readonly fs: Map<string, Dir>;
    private _pwd: string;

    constructor(commands: Array<Array<string>>) {
        this.root = new Dir('/', []);
        this._pwd = '/';
        this.fs = new Map<string, Dir>();

        for (const command of commands) {
            const cmd = new Command(this._pwd, command[0], command.slice(1).join('\n'));
            const res = cmd.exec();
            if (res) {
                this.fs.set(cmd.pwd, res);
            }
            this._pwd = cmd.pwd;
        }
    }

    findMax(size: number): Array<Dir> {
        const max = new Array<Dir>();
        this.fs.forEach((dir) => {
            if (dir.name === '/') { return; }
            if (dir.size() < size) {
                max.push(dir);
            }
        });
        return max;
    }
}

const splitInput = input
    .split('$')
    .map((io) => io
        .trim()
        .split('\n'));

const os = new OS(splitInput);


// console.log(JSON.stringify(Object.fromEntries(os.fs.entries()), null, 2));

os.findMax(100000).forEach((dir) => dir.name.split('/').length < 4 ? console.log(dir.name, dir.size()) : undefined);