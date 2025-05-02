import { Schema, model } from "mongoose";
import { JobAppDtoType } from "../../../dto/job/jobApplication.dto";
import {
  ApplicantTypes,
  JobExperiences,
  JobTypes,
  WorkplaceTypes,
} from "../../../types/job.type";

const jobDetails = {
  jobTitle: {
    type: String,
    required: true,
  },
  department: {
    type: [String],
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobRequirements: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  applicantTypes: {
    type: [String],
    enum: ApplicantTypes,
    required: true,
  },
  jobType: {
    type: [String],
    enum: JobTypes,
    required: true,
  },
  workplaceType: {
    type: [String],
    enum: WorkplaceTypes,
    required: true,
  },
  jobExperience: {
    type: String,
    enum: JobExperiences,
  },
  salary: {
    min: { type: Number },
    max: { type: Number },
  },
};

const companyDetails = {
  companyId: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
};

const JobSchema = new Schema(
  {
    actorType: { type: String, default: "job" },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      default: "",
    },
    expireAt: { type: Date },
    viewsCount: { type: Number, default: 0 },
    jobLink: {
      type: String,
      default: "",
    },
    ...companyDetails,
    ...jobDetails,
  },
  { timestamps: true }
);

JobSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const Job = model<JobAppDtoType>("job_jobs", JobSchema);
export default Job;
