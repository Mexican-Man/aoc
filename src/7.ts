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

    constructor(pwd: string, input: string) {
        this._pwd = pwd;
        this._cmd = input.trim().split(' ');
    }

    exec(): void {

        if (this._cmd[0] === 'cd') {
            if (this._cmd[1] === '..') {
                this._pwd = this._pwd.split('/').slice(0, -1).join('/');
            } else {
                this._pwd = this._pwd + '/' + this._cmd[1];
            }
        } else if (this._cmd[0].startsWith('ls')) {
            console.log(this._cmd);
            const dir = new Dir(this._pwd, this._cmd[1]);
            // console.log(dir);
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
    readonly files: Array<File>;

    constructor(name: string, files: string) {
        this.name = name;
        this.files = files.split('\n').map(file => {
            const [size, name] = file.split(' ');
            return new File(name, parseInt(size));
        });
    }
}

const splitInput = input.split('$');

let pwd = "/";
for (const command of splitInput) {
    const cmd = new Command(pwd, command);
    cmd.exec();
    pwd = cmd.pwd;
}