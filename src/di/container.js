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
import EducationalContentDataSource from '@/data/datasources/EducationalContentDataSource';
import EducationalContentRepositoryImpl from '@/data/repositories/EducationalContentRepositoryImpl';
import GetEducationalContentUseCase from '@/domain/usecases/educationalcontents/GetEducationalContentUseCase';
import SaveEducationalContentUseCase from '@/domain/usecases/educationalcontents/SaveEducationalContentUseCase';

import SaveNafathCenterUseCase  from '@/domain/usecases/nafathcenter/SaveNafathCenterUseCase';
import NafathCenterRemoteDataSource from '@/data/datasources/NafathCenterRemoteDataSource';
import NafathCenterRepositoryImpl  from '@/data/repositories/NafathCenterRepositoryImpl';





// ---------- Data Sources ----------
const authLocalDataSource = new AuthLocalDataSource();
const authRemoteDataSource = new AuthRemoteDataSource();
const agreementLocalDataSource = new AgreementLocalDataSource();
const educationalContentDataSource=new EducationalContentDataSource();
const nafathCenterRemoteDataSource=new NafathCenterRemoteDataSource();


// ---------- Repositories ----------
const authRepository = new AuthRepositoryImpl({
  localDataSource: authLocalDataSource,
  remoteDataSource: authRemoteDataSource,
});
const agreementRepository = new AgreementRepositoryImpl(agreementLocalDataSource);

const educationalContentRepository =new EducationalContentRepositoryImpl({localDataSource:educationalContentDataSource});
const nafathCenterRepository=new NafathCenterRepositoryImpl({remoteDataSource:nafathCenterRemoteDataSource});




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

  //Educatinoal Content
  getEducationalContentUseCase:new GetEducationalContentUseCase({educationalContentRepository}),
  saveEducationalContentUseCase:new SaveEducationalContentUseCase({educationalContentRepository}),

  //nafath Center
  saveNafathCenterUseCase:new SaveNafathCenterUseCase({nafathCenterRepository}),

};

export default container;