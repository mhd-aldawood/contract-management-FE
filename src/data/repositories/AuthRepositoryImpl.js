// src/data/repositories/AuthRepositoryImpl.js
import AuthRepository from "@/domain/repositories/AuthRepository";
import User from "@/domain/entities/User";

export default class AuthRepositoryImpl extends AuthRepository {
  constructor({ localDataSource, remoteDataSource }) {
    super();
    this.local = localDataSource;
    this.remote = remoteDataSource;
  }

  async signup({ username, email, password, password2 }) {
    const data = await this.remote.signup({
      username,
      email,
      password,
      password2,
    });
    // Persist tokens locally if your backend returns them
    if (data.token) this.local.saveToken(data.token);
    if (data.refresh) this.local.saveRefreshToken(data.refresh);
    return new User(data.user ?? { username, email });
  }

  async login({ username, password }) {
    const data = await this.remote.login({ username, password });
    if (data.token) this.local.saveToken(data.token);
    if (data.refresh) this.local.saveRefreshToken(data.refresh);
    return new User(data.user ?? { username });
  }

  getCurrentUser() {
    const session = this.local.getSession();
    if (!session) return null;
    return new User(session);
  }
}
