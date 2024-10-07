# Parquet Explorer

**A browser-based SQL editor for the blockchain.**

## 📚 Description

Parquet Explorer is a web application that allows users to upload, store, and query Parquet files directly in the browser. It leverages blockchain technology for secure storage and WebAssembly for local-first data processing. This architecture allows for the analysis of surprisingly large datasets, despite the performance limitations of web browsers and the resource constraints inherent to the Internet Computer Protocol. This project is meant to demonstrate the feasibility of adapting familiar data formats and analysis tools such as Parquet and SQL for use in a fully decentralized blockchain application.

## ✅  Features

- Upload and store Parquet files on-chain using [Juno Storage](https://juno.build/docs/build/storage)
- Client-side query processing via [DuckDB WASM](https://duckdb.org/docs/api/wasm/overview)
- Interactive SQL editor for querying Parquet data
- Metadata visualization for uploaded Parquet files
- Secure authentication powered by Internet Identity
- Zero setup required to start exploring your data

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Data Processing**: DuckDB WASM
- **Storage**: Juno (Blockchain-based)
- **Authentication**: Internet Identity
- **Deployment**: Juno Hosting

## 🌟 Live Demo

Experience Parquet Explorer in action:

**[https://w6tkp-yaaaa-aaaal-amnwa-cai.icp0.io/](https://w6tkp-yaaaa-aaaal-amnwa-cai.icp0.io/)**

## 🚧 Project Status

This project is currently a proof of concept and is not intended for production use.

## 🏗️ Local Development

To set up the project locally:

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start a local Juno satellite:

    ```bash
    docker-compose up -d
    ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

## 🚀 Deployment

This project is configured for automatic deployment to Juno hosting. The deployment process is handled by GitHub Actions, as defined in the [workflow file](.github/workflows/main.yml).

Ensure that you have set up the `JUNO_TOKEN` secret in your GitHub repository settings. See [Juno Docs](https://juno.build/docs/guides/github-actions) for more information.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

Much of the source code and styles from this project are borrowed from the [Juno Next.js example](https://github.com/junobuild/create-juno/tree/main/templates/nextjs-example) which is also open source and available under an MIT License.

## 📞 Contact

For questions or feedback, please reach out:

- Email: [crabtr26@proton.me](mailto:crabtr26@proton.me)
- LinkedIn: [Jacob Crabtree](https://www.linkedin.com/in/jacob-crabtree-7ab72610a/)
- Twitter: [@crabtr26](https://x.com/crabtr26)

## 🔗 Links and Resources

- [Juno](https://juno.build): The hosting and development platform used for this project. Juno provides blockchain-based storage and hosting solutions, enabling decentralized application development.

- [DuckDB](https://duckdb.org): An in-process SQL OLAP database management system. This project uses DuckDB's WebAssembly build to enable powerful in-browser SQL querying capabilities.

- [Internet Computer](https://internetcomputer.org): The underlying blockchain infrastructure powering this application. The Internet Computer provides a decentralized cloud platform for building and hosting applications.

- [Parquet](https://parquet.apache.org/): An open source, column-oriented data file format designed for efficient data storage and retrieval. This project focuses on exploring and querying Parquet files.

- [WebAssembly](https://webassembly.org/): A binary instruction format for a stack-based virtual machine, enabling high-performance applications on web pages. This project leverages WebAssembly for efficient data processing in the browser.
