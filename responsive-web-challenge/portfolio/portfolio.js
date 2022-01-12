const projectTags = document.querySelectorAll('.project-tag');
const projects = document.querySelectorAll('.project');
const projectNo = document.querySelector('.project__no');

projectNo.innerText = projects.length

projectTags.forEach(projectTag => {
    projectTag.addEventListener('click', () => {
        let i = 0
        const filterTag = projectTag.innerText;
        
        projects.forEach(project => {
            const tag = project.querySelector('.tag').innerText
            // console.log(tag)

            if (!tag.includes(filterTag)) {
                project.classList.add('d-none')
            } else {
                project.classList.remove('d-none')
                i++
            }

        })
        
        projectNo.innerText = i
    })
})