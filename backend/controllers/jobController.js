// Get all jobs with advanced filtering
exports.getAllJobs = catchAsync(async (req, res, next) => {
  let query = { status: 'active' };
  
  // Advanced filtering
  const { search, location, category, salaryMin, salaryMax, page = 1, limit = 10 } = req.query;
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }
  
  if (category && category !== 'All Categories') {
    query.category = category;
  }
  
  if (salaryMin || salaryMax) {
    query.salary = {};
    if (salaryMin) query.salary.$gte = salaryMin;
    if (salaryMax) query.salary.$lte = salaryMax;
  }
  
  // Pagination
  const skip = (page - 1) * limit;
  
  const jobs = await Job.find(query)
    .populate('recruiterId', 'name company')
    .sort('-postedDate')
    .skip(skip)
    .limit(parseInt(limit));
  
  const total = await Job.countDocuments(query);
  
  res.json({
    success: true,
    count: jobs.length,
    total,
    pages: Math.ceil(total / limit),
    currentPage: parseInt(page),
    jobs
  });
});