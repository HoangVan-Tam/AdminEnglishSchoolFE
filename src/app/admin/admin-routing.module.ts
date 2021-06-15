import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../services/auth-guard/auth-guard.guard";
import { LoginGuard } from "../services/auth-guard/login-guard.guard";
import { AdminComponent } from "./admin.component";
import { AdminloginComponent } from "./component/admin-login/admin-login.component";

const routes: Routes=[{
    path:'admin/dashboard',
    component:AdminComponent,
    children:[
        { path: 'student', loadChildren: () => import('../admin/module/manage-student/manage-student.module').then(m => m.ManageStudentModule), canActivate:[AuthGuard], },
        { path: 'recruitment', loadChildren: () => import('../admin/module/manage-recruitment/manage-recruitment.module').then(m => m.ManageRecruitmentModule), canActivate:[AuthGuard], },
        { path: 'department', loadChildren: () => import('./module/manage-department/manage-department.module').then(m => m.ManageDepartmentModule), canActivate:[AuthGuard], },
        { path: 'class', loadChildren: () => import('./module/manage-class/manage-class.module').then(m => m.ManageClassModule), canActivate:[AuthGuard], },
        { path: 'event', loadChildren: () => import('./module/manage-event/manage-event.module').then(m => m.ManageEventModule), canActivate:[AuthGuard], },
        { path: 'advisory', loadChildren: () => import('./module/manage-advisory/manage-advisory.module').then(m => m.ManageAdvisoryModule), canActivate:[AuthGuard], },
        { path: 'course', loadChildren: () => import('./module/manage-course/manage-course.module').then(m => m.ManageCourseModule), canActivate:[AuthGuard], },
        { path: 'question', loadChildren: () => import('./module/manage-question/manage-question.module').then(m => m.ManageQuestionModule), canActivate:[AuthGuard], },
        { path: 'student/:id', loadChildren: () => import('./module/student-detail/student-detail.module').then(m => m.ManageStudentModule), canActivate:[AuthGuard],},
        { path: 'teacher', loadChildren: () => import('./module/manage-teacher/manage-teacher.module').then(m=>m.ManageTeacherModule), canActivate:[AuthGuard],},
    ]},
    {path:'login', component:AdminloginComponent, canActivate:[LoginGuard]}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }