const assert = (condition, message) => {
  if (!condition) throw new Error(`Invalid content/site.json: ${message}`);
};

const requireString = (value, path) => {
  assert(typeof value === 'string' && value.trim().length > 0, `"${path}" must be a non-empty string.`);
};

const requireCollection = (content, name, fields) => {
  const collection = content[name];
  assert(Array.isArray(collection) && collection.length > 0, `"${name}" must be a non-empty array.`);

  collection.forEach((item, index) => {
    fields.forEach((field) => requireString(item[field], `${name}[${index}].${field}`));
  });
};

export const validateContent = (content) => {
  assert(content && typeof content === 'object', 'the root must be an object.');

  ['site', 'home', 'cv'].forEach((section) => {
    assert(content[section] && typeof content[section] === 'object', `"${section}" must be an object.`);
  });

  ['name', 'firstName', 'initials', 'url', 'email', 'location', 'github', 'scholar', 'linkedin', 'cvSource', 'lastUpdated'].forEach((field) => {
    requireString(content.site[field], `site.${field}`);
  });
  assert(content.site.advisor && typeof content.site.advisor === 'object', '"site.advisor" must be an object.');
  ['name', 'url'].forEach((field) => requireString(content.site.advisor[field], `site.advisor.${field}`));
  requireString(content.site.undergraduateInstitution, 'site.undergraduateInstitution');
  ['title', 'description', 'socialDescription', 'eyebrow', 'greeting', 'introduction', 'studentStatus', 'undergraduatePrefix', 'venues', 'affiliation', 'footerTagline'].forEach((field) => {
    requireString(content.home[field], `home.${field}`);
  });
  assert(content.home.about && typeof content.home.about === 'object', '"home.about" must be an object.');
  ['heading', 'currentWork', 'previousWork', 'educationBeforeAdvisor', 'educationAfterAdvisor'].forEach((field) => {
    requireString(content.home.about[field], `home.about.${field}`);
  });
  ['description', 'title'].forEach((field) => requireString(content.cv[field], `cv.${field}`));

  requireCollection(content, 'education', ['institution', 'degree', 'homeDates', 'homeMeta', 'cvDates']);
  requireCollection(content, 'experience', ['organization', 'role', 'homeDates', 'cvDates', 'location', 'description']);
  requireCollection(content, 'service', ['role', 'venue']);
  requireCollection(content, 'skills', ['category', 'items']);

  assert(Array.isArray(content.publications) && content.publications.length > 0, '"publications" must be a non-empty array.');
  content.publications.forEach((publication, index) => {
    const path = `publications[${index}]`;
    requireString(publication.title, `${path}.title`);
    requireString(publication.cvVenue, `${path}.cvVenue`);
    assert(Number.isInteger(publication.year), `"${path}.year" must be an integer.`);
    assert(Array.isArray(publication.authors) && publication.authors.length > 0, `"${path}.authors" must be a non-empty array.`);
    publication.authors.forEach((author, authorIndex) => requireString(author, `${path}.authors[${authorIndex}]`));

    if (publication.selected) {
      requireString(publication.venue, `${path}.venue`);
      requireString(publication.url, `${path}.url`);
    }
  });

  const publicationTitles = content.publications.map(({ title }) => title);
  assert(new Set(publicationTitles).size === publicationTitles.length, 'publication titles must be unique.');
};
