module.exports = {
  devOptions: {
    port: 8000,
    open: "none",
  },
  mount: {
    public: "/",
    src: "/dist",
  },
  buildOptions: {
    out: "dist",
  },
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
};
