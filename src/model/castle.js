'use strict';

import mongoose from 'mongoose';

const castleSchema = mongoose.Schema({
  style: {
    type: String,
    required: true,
  },
  family: {
    type: String,
    required: true,
    unique: true,
  },
  kingdom: {
    type: String,
    required: true,
  },
  farming: {
    type: String,
    required: true,
  },
});

export default mongoose.model('castle', castleSchema);
