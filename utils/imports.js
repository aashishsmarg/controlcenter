import express from 'express';
const router = express.Router();  

// module imports
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath , format } from 'url';
import axios from 'axios';

import session from 'express-session';
import mysql from 'mysql2'
import util from 'util';
import winston from 'winston';
import moment from 'moment-timezone';
import flash from 'connect-flash'
import { exec } from 'child_process'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto' 
import nodemailer from 'nodemailer'
import fs from 'fs'
import https from 'https'
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import fileUpload from 'express-fileupload';
// middleware configurations
import logger from '../middleware/loggerMiddleware.js'

import {flashMiddleware } from '../middleware/flashMiddleware.js' 
import {authMiddleware , generateToken } from '../middleware/authMiddleware.js'
// import sessionMiddleware from '../middleware/sessionMiddlewares.js'
import securtiyMiddleware from '../middleware/securityMiddleware.js'
import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js'

import config from '../config/config.js'
import db from '../config/database.js'
import { encrypt , decrypt } from '../utils/crypto.js'
import sendmailUtil from './sendmail.js';
import sendDailyReportScript from '../reportingscripts/send.daily.report.js';
import SendMonthlyReportScript from '../reportingscripts/send.monthly.report.js';
import SendWeeklyReportScript from '../reportingscripts/send.weekly.report.js';
import {generate_parked_vehicle_report , generate_footfall_reports , generate_footfall_distribution_report} from '../reportingscripts/generate.reports.js'
// import SentSupportMail from './supportMail.js'
import * as devSession from '../tests/dev.create.session.js'
export {  router, express , dirname , fileURLToPath , path , axios , session , mysql , util , winston , logger , moment , config , db , flash , devSession , exec , jwt , authMiddleware , generateToken , cookieParser , bcrypt , crypto , encrypt , decrypt , dotenv , sendmailUtil , nodemailer , sendDailyReportScript , generate_parked_vehicle_report , generate_footfall_reports , generate_footfall_distribution_report , SendMonthlyReportScript , SendWeeklyReportScript , fs , https , helmet , securtiyMiddleware , cors , flashMiddleware , rateLimit , format , fileUploadMiddleware , multer , fileUpload }; 