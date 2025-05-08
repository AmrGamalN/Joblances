import { Schema, model } from "mongoose";
import { EducationDtoType } from "../../../dto/client/education.dto";
const EducationSchema = new Schema(
  {
    userId: { type: String, ref: "user_users", required: true },
    university: { type: String, required: true },
    description: { type: String, required: true },
    degree: { type: String, required: true },
    major: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    gpa: { type: Number, required: true },
  },
  { timestamps: true }
);

const Education = model<EducationDtoType>("user_educations", EducationSchema);
export default Education;
