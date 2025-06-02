import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Menú',
        isTitle: true
    },
    {
        id: 2,
        label: 'Panel de Control',
        icon: 'bx-home-circle',
        subItems: [
            {
                id: 3,
                label: 'Principal',
                link: '/dashboard',
                parentId: 2
            },
        ]
    },
    // {
    //     id: 4,
    //     label: 'Mantenimiento',
    //     icon: 'bx-home-circle',
    //     subItems: [
    //         {
    //             id: 5,
    //             label: 'Perfiles',
    //             link: '/mantenimiento/perfil',
    //             parentId: 4
    //         }
    //     ]
    // },
    {
        id: 6,
        label: 'Operaciones',
        icon: 'bx-cog',
        subItems: [
            {
                id: 7,
                label: 'Convenios',
                link: '/convenio',
                parentId: 6
            },
        ]
    },
];

