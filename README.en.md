# Kule Pro: a supply chain decision support tool

**Language:** [Turkish](README.md) · English (this page)

**Version:** 0.15.0. The source code is not published in this release.

Kule Pro reads a company's stock, order, goods receipt and invoice files. You upload the files. Modules check the data against explicit rules and put the items that need attention into one list. Each item says who should look at it and where to go in SAP. A person makes the decision. In the default setup, no module calls a language model.

The measurements use synthetic data and public data. The tool has not yet been tried on a real SAP export.

## Try it

- [Product page](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/): what it does, how it works, its limits
- [Home page](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Videos](https://sahinoglu0.github.io/ai-otomasyon-portfoy/video/): introduction and usage, with Turkish and English subtitles

## Quick start

No installation is needed. Opening the live page is enough.

To run the demo from this repository, open `demo/index.html` in a browser. The demo is the browser layer of the panel, working on sample data.

## Documentation

- [Technical detail](docs/technical-detail.md): test evidence, measurements, agent flow, modules, decision engine
- [Changelog](CHANGELOG.en.md)
- [Security](SECURITY.md)
- [License](LICENSE)
