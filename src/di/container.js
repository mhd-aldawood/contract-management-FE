import AuthLocalDataSource from "@/data/datasources/AuthLocalDataSource";
import AuthRepositoryImpl from "@/data/repositories/AuthRepositoryImpl";
import SignupUseCase from "@/domain/usecases/SignupUseCase";
import LoginUseCase from "@/domain/usecases/LoginUseCase";
import AuthRemoteDataSource from "@/data/datasources/AuthRemoteDataSource";

import { AgreementLocalDataSource } from '@/data/datasources/AgreementLocalDataSource';
import { AgreementRepositoryImpl } from '@/data/repositories/AgreementRepositoryImpl';
import { GetAgreementsUseCase } from '@/domain/usecases/agreements/GetAgreementsUseCase';
import { GetCostDetailsUseCase } from '@/domain/usecases/agreements/GetCostDetailsUseCase';
import { FilterAgreementsUseCase } from '@/domain/usecases/agreements/FilterAgreementsUseCase';
import { ExportAgreementsUseCase } from '@/domain/usecases/agreements/ExportAgreementsUseCase';

// ---------- Data Sources ----------
const authLocalDataSource = new AuthLocalDataSource();
const authRemoteDataSource = new AuthRemoteDataSource();
const agreementLocalDataSource = new AgreementLocalDataSource();

// ---------- Repositories ----------
const authRepository = new AuthRepositoryImpl({
  localDataSource: authLocalDataSource,
  remoteDataSource: authRemoteDataSource,
});
const agreementRepository = new AgreementRepositoryImpl(agreementLocalDataSource);

// ---------- Container ----------
const container = {
  // Auth
  authRepository,
  signupUseCase: new SignupUseCase(authRepository),
  loginUseCase: new LoginUseCase(authRepository),

  // Agreements
  agreementRepository,
  getAgreementsUseCase: new GetAgreementsUseCase(agreementRepository),
  getCostDetailsUseCase: new GetCostDetailsUseCase(agreementRepository),
  filterAgreementsUseCase: new FilterAgreementsUseCase(),
  exportAgreementsUseCase: new ExportAgreementsUseCase(),
};

export default container;