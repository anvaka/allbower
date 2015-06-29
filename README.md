# allbower

Bower dependency graph crawler. This indexer is somewhat strict, and if your
bower.json is not a valid json it will not let it through.

# install

This simple steps will produce local version of the bower graph:

```
git clone https://github.com/anvaka/allbower
cd allbower
npm install
node index.js
node layout.js
node toBinary.js
```

The ouptut is stored to `./data` folder, and can be consumed by [pm visualization](https://github.com/anvaka/pm)

# license

MIT
