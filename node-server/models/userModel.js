import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserTypes, SocialPlatforms } from '../constants/modelConstants.js'
import { capitalizeEveryWordFirstLetter, isEmail } from '../utils/commonMethodsUtil.js';

const userTypes = Object.values(UserTypes);

const locationSchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true,
      default: 'IN'
    }
  }
);

const socialLinkSchema = mongoose.Schema(
  {
    platform: {
      type: String,
      enum: SocialPlatforms,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
)

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: isEmail,
        message: props => `${props.value} is not a valid email`
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      trim: true
    },
    imageUrl: {
      type: String,
      required: false
    },
    about: {
      type: String,
      required: false
    },
    location: {
      type: locationSchema,
      required: false
    },
    website: {
      type: String,
      required: false
    },
    socialLinks: [socialLinkSchema],
    userType: {
      type: String,
      enum: userTypes,
      required: true,
      default: UserTypes.USER,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    isEmailVerified: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  //To bcrypt password.
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  //To capitalize first letter of firstName as capital.
  if(this.isModified('firstName')){
    this.firstName = capitalizeEveryWordFirstLetter(this.firstName); 
  }

  //To capitalize first letter of lastName as capital.
  if(this.isModified('lastName')){
    this.lastName = capitalizeEveryWordFirstLetter(this.lastName); 
  }

  //To ensure 'http' is prefixed in website.
  if (this.isModified('website')) {
    if (this.website.trim().substring(0, 4) !== 'http') {
      this.website = `http://${this.website.trim()}`;
    } else this.website = this.website.trim();
  }
  next();
});

socialLinkSchema.pre('save', async function (next) {
  //To ensure 'http' is prefixed in social media links.
  if (this.isModified('link')) {
    if (this.link.trim().substring(0, 4) !== 'http') {
      this.link = `http://${this.link.trim()}`;
    } else this.link = this.link.trim();
  }
  next();
})

const User = mongoose.model('User', userSchema);
export default User;