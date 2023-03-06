import * as express from 'express';
import 'express-async-errors';
import teamsRouter from './api/Router/Teams.router';
import loginRouter from './api/Router/Login.router';
import matchesRouter from './api/Router/Matches.router';
import errorMiddleware from './api/Middleware/ErrorMiddleware';
import leaderboardRouter from './api/Router/Leaderboard.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.use(teamsRouter);
    this.app.use(loginRouter);
    this.app.use(matchesRouter);
    this.app.use(leaderboardRouter);
    this.app.use(errorMiddleware);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
