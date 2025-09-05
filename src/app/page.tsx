export default function Home() {
  return (
    <main className="d-flex flex-column min-vh-100">
      <header className="container-fluid border-bottom py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">App Title</h1>
          <nav>
            <button className="btn btn-primary">Button</button>
          </nav>
        </div>
      </header>

      <section className="container-fluid flex-grow-1">
        <div className="row">
          <div className="col-12">
            <article className="card">
              <div className="card-body">
                <p>Your content goes here</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="container-fluid border-top py-3 mt-auto">
        <div className="d-flex align-items-center justify-content-between gap-2">
          <div>
            <a href="#" className="text-decoration-none">
              Footer Link
            </a>
          </div>
          <div>
            <span className="text-muted">Footer Text</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
