const form = document.getElementById('resume-form');
const skillsContainer = document.getElementById('skills-container');
const experienceContainer = document.getElementById('experience-container');
const educationContainer = document.getElementById('education-container');
const addSkillButton = document.getElementById('add-skill');
const addExperienceButton = document.getElementById('add-experience');
const addEducationButton = document.getElementById('add-education');

// Add event listeners to the add buttons
addSkillButton.addEventListener('click', addSkill);
addExperienceButton.addEventListener('click', addExperience);
addEducationButton.addEventListener('click', addEducation);

function addSkill() {
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'skills';
  input.required = true;
  const removeButton = createRemoveButton(input);
  const skill = document.createElement('div');
  skill.classList.add('input-group');
  skill.appendChild(input);
  skill.appendChild(removeButton);
  skillsContainer.appendChild(skill);
}

function addExperience() {
  const titleInput = createTextInput('title', true);
  const companyInput = createTextInput('company', true);
  const locationInput = createTextInput('location', true);
  const startDateInput = createDatePicker('startDate', true);
  const endDateInput = createDatePicker('endDate', true);
  const responsibilitiesInput = createTextarea('responsibilities', true);
  const removeButton = createRemoveButton(titleInput, companyInput, locationInput, startDateInput, endDateInput, responsibilitiesInput);
  const experience = document.createElement('div');
  experience.classList.add('input-group');
  experience.appendChild(titleInput);
  experience.appendChild(companyInput);
  experience.appendChild(locationInput);
  experience.appendChild(startDateInput);
  experience.appendChild(endDateInput);
  experience.appendChild(responsibilitiesInput);
  experience.appendChild(removeButton);
  experienceContainer.appendChild(experience);
}

function addEducation() {
  const schoolInput = createTextInput('school', true);
  const degreeInput = createTextInput('degree', true);
  const majorInput = createTextInput('major', true);
  const locationInput = createTextInput('location', true);
  const startDateInput = createDatePicker('startDate', true);
  const endDateInput = createDatePicker('endDate', true);
  const removeButton = createRemoveButton(schoolInput, degreeInput, majorInput, locationInput, startDateInput, endDateInput);
  const education = document.createElement('div');
  education.classList.add('input-group');
  education.appendChild(schoolInput);
  education.appendChild(degreeInput);
  education.appendChild(majorInput);
  education.appendChild(locationInput);
  education.appendChild(startDateInput);
  education.appendChild(endDateInput);
  education.appendChild(removeButton);
  educationContainer.appendChild(education);
}

function createTextInput(name, required) {
    const label = document.createElement('label');
    label.textContent = name;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.name = name;
    input.required = required;
    
    const container = document.createElement('div');
    container.classList.add('form-group');
    container.appendChild(label);
    container.appendChild(input);
    
    return container;
  }
  
function createDatePicker(name, required) {
    const label = document.createElement('label');
    label.textContent = name;
    
    const input = document.createElement('input');
    input.type = 'month';
    input.name = name;
    input.required = required;
    
    const container = document.createElement('div');
    container.classList.add('form-group');
    container.appendChild(label);
    container.appendChild(input);
    
    return container;
}

function createTextarea(name, required) {

    const label = document.createElement('label');
    label.textContent = name;

    const textarea = document.createElement('textarea');
    textarea.name = name;
    textarea.rows = '4';
    textarea.required = required;

    const container = document.createElement('div');
    container.classList.add('form-group');
    container.appendChild(label);
    container.appendChild(textarea);
  return container;
}

function createRemoveButton(...inputs) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Remove';
  button.addEventListener('click', () => {
    for (const input of inputs) {
      input.parentElement.remove();
    }
  });
  return button;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
  
    // Gather form data
    const formData = new FormData(form);
    const skills = Array.from(formData.getAll('skills'));
    const experiences = [];
    const educations = [];
  
    // Parse experience data
    const experienceInputs = experienceContainer.querySelectorAll('.input-group');
    for (const inputGroup of experienceInputs) {
      const title = inputGroup.querySelector('input[name="title"]').value;
      const company = inputGroup.querySelector('input[name="company"]').value;
      const location = inputGroup.querySelector('input[name="location"]').value;
      const startDate = inputGroup.querySelector('input[name="startDate"]').value;
      const endDate = inputGroup.querySelector('input[name="endDate"]').value;
      const responsibilities = inputGroup.querySelector('textarea[name="responsibilities"]').value;
      experiences.push({ title, company, location, startDate, endDate, responsibilities });
    }
  
    // Parse education data
    const educationInputs = educationContainer.querySelectorAll('.input-group');
    for (const inputGroup of educationInputs) {
      const school = inputGroup.querySelector('input[name="school"]').value;
      const degree = inputGroup.querySelector('input[name="degree"]').value;
      const major = inputGroup.querySelector('input[name="major"]').value;
      const location = inputGroup.querySelector('input[name="location"]').value;
      const startDate = inputGroup.querySelector('input[name="startDate"]').value;
      const endDate = inputGroup.querySelector('input[name="endDate"]').value;
      educations.push({ school, degree, major, location, startDate, endDate });
    }
  
    // Construct resume object
    const resume = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      summary: formData.get('summary'),
      skills,
      experiences,
      educations,
    };
    console.log(resume)
    console.log(JSON.stringify(resume))
    stringedResume = JSON.stringify(resume)
    // go to /resume with the resume object with post request
    fetch('/resume', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: stringedResume
    })
    .then((response) => response.json())
    .then((data) => {
        // window.location.href = '/resume';
    }
    )
    .catch((error) => {
        console.error('Error:', error);
    }
    );
  });