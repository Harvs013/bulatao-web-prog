// bulatao-server/models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  author:   { type: String, required: true },
  category: { type: String, required: true },
  summary:  { type: String, required: true },
  body:     { type: String, required: true },
  image:    { type: String, default: '' },
  status:   { type: String, enum: ['published', 'draft', 'archived'], default: 'draft' },
  date:     { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);