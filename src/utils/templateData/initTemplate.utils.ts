import { sequelize } from '../../config/sequelize';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { UserProject } from '../../models/userProject.model';
import { projects, userProjectAssignments, users } from './templateData.utils';

const initData = async () => {
    try {
        // Sincronizar la base de datos
        await sequelize.sync({ force: true });

        // Crear usuarios por defecto
        for (const userData of users) {
            await User.findOrCreate({
                where: { email: userData.email },
                defaults: userData,
            });
        }

        // Crear proyectos por defecto
        for (const projectData of projects) {
            await Project.findOrCreate({
                where: { name: projectData.name },
                defaults: projectData,
            });
        }

        // Asignar usuarios a proyectos
        for (const assignment of userProjectAssignments) {
            await UserProject.findOrCreate({
                where: {
                    userId: assignment.userId,
                    projectId: assignment.projectId,
                },
                defaults: assignment,
            });
        }

        console.log('Default data initialized');
    } catch (error) {
        console.error('Error initializing default data:', error);
    }
};

export default initData;
