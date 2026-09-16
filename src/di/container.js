import  AuthLocalDataSource  from "@/data/datasources/AuthLocalDataSource";
import  AuthRepositoryImpl  from "@/data/repositories/AuthRepositoryImpl";
import  SignupUseCase  from "@/domain/usecases/SignupUseCase";
import  LoginUseCase  from "@/domain/usecases/LoginUseCase";
import  AuthRemoteDataSource  from "@/data/datasources/AuthRemoteDataSource";

import { AgreementLocalDataSource } from '@/data/datasources/AgreementLocalDataSource';
import { AgreementRepositoryImpl } from '@/data/repositories/AgreementRepositoryImpl';
import { GetAgreementsUseCase } from '@/domain/usecases/agreements/GetAgreementsUseCase';
import { GetCostDetailsUseCase } from '@/domain/usecases/agreements/GetCostDetailsUseCase';
import { FilterAgreementsUseCase } from '@/domain/usecases/agreements/FilterAgreementsUseCase';
import { ExportAgreementsUseCase } from '@/domain/usecases/agreements/ExportAgreementsUseCase';

const localDataSource = new AuthLocalDataSource();
const remoteDataSource = new AuthRemoteDataSource();

const authRepository = new AuthRepositoryImpl({
  localDataSource,
  remoteDataSource,
});
export const authRepositoryInstance = authRepository

export const signupUseCase = new SignupUseCase(authRepository);
export const loginUseCase = new LoginUseCase(authRepository);


/* ---------- agreements wiring (new) ---------- */
const agreementLocal = new AgreementLocalDataSource();
const agreementRepository = new AgreementRepositoryImpl(agreementLocal);


  // agreements
export const  getAgreementsUseCase= new GetAgreementsUseCase(agreementRepository);
export const  getCostDetailsUseCase= new GetCostDetailsUseCase(agreementRepository);
export const  filterAgreementsUseCase= new FilterAgreementsUseCase();
export const  exportAgreementsUseCase= new ExportAgreementsUseCase();
/*const container = {
  // auth
  loginUseCase: new LoginUseCase(authRepository),
  signupUseCase: new SignupUseCase(authRepository),

  // agreements
  getAgreementsUseCase: new GetAgreementsUseCase(agreementRepository),
  getCostDetailsUseCase: new GetCostDetailsUseCase(agreementRepository),
  filterAgreementsUseCase: new FilterAgreementsUseCase(),
  exportAgreementsUseCase: new ExportAgreementsUseCase(),
}; */