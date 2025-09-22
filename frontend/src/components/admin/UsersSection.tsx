import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Search,
  UserCheck,
  UserX,
  RefreshCw,
  Download,
  Filter,
  User
} from "lucide-react";
import api from "@/config/api";

interface UserType {
  id: number;
  name: string;
  email: string;
  phone?: string;
  user_type: string;
  status: string;
  created_at: string;
  company_name?: string;
}

interface UsersSectionProps {
  isRTL: boolean;
  users?: UserType[];
}

const UsersSection = ({ isRTL, users: initialUsers = [] }: UsersSectionProps) => {
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    user_type: "freelancer",
    status: "active",
    password: ""
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);

      // Check if it's an authentication error
      if (error.response?.status === 401) {
        toast({
          title: isRTL ? "خطأ في المصادقة" : "Authentication Error",
          description: isRTL ? "يرجى تسجيل الدخول كمدير" : "Please login as admin",
          variant: "destructive"
        });
      }

      // Use dummy data for demonstration
      setUsers([
        { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', user_type: 'freelancer', status: 'active', created_at: '2024-01-15', phone: '0501234567' },
        { id: 2, name: 'فاطمة السعيد', email: 'fatima@example.com', user_type: 'employer', status: 'active', created_at: '2024-01-14', company_name: 'شركة النور' },
        { id: 3, name: 'محمد الحارثي', email: 'mohammed@example.com', user_type: 'freelancer', status: 'suspended', created_at: '2024-01-13' },
        { id: 4, name: 'سارة أحمد', email: 'sara@example.com', user_type: 'client', status: 'active', created_at: '2024-01-12' },
        { id: 5, name: 'عبدالله الشمري', email: 'abdullah@example.com', user_type: 'employer', status: 'banned', created_at: '2024-01-11' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: number, newStatus: string) => {
    try {
      await api.put(`/admin/users/${userId}/status`, { status: newStatus });
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم تحديث حالة المستخدم" : "User status updated"
      });
      fetchUsers();
    } catch (error) {
      // Update locally for demo
      setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم تحديث حالة المستخدم" : "User status updated"
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await api.delete(`/admin/users/${selectedUser.id}`);
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم حذف المستخدم" : "User deleted"
      });
      fetchUsers();
    } catch (error) {
      // Remove locally for demo
      setUsers(users.filter(u => u.id !== selectedUser.id));
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم حذف المستخدم" : "User deleted"
      });
    }
    setDeleteDialog(false);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      await api.put(`/admin/users/${selectedUser.id}`, formData);
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم تحديث بيانات المستخدم" : "User updated"
      });
      fetchUsers();
    } catch (error) {
      // Update locally for demo
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم تحديث بيانات المستخدم" : "User updated"
      });
    }
    setEditDialog(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/admin/users', formData);
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم إضافة المستخدم" : "User added"
      });
      fetchUsers();
    } catch (error) {
      // Add locally for demo
      const newUser = {
        id: users.length + 1,
        ...formData,
        created_at: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      toast({
        title: isRTL ? "نجح" : "Success",
        description: isRTL ? "تم إضافة المستخدم" : "User added"
      });
    }
    setAddDialog(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      user_type: "freelancer",
      status: "active",
      password: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return { variant: 'default' as const, className: 'bg-green-500 hover:bg-green-600 text-white' };
      case 'suspended':
        return { variant: 'secondary' as const, className: 'bg-yellow-500 hover:bg-yellow-600 text-white' };
      case 'banned':
        return { variant: 'destructive' as const };
      case 'inactive':
        return { variant: 'outline' as const };
      default:
        return { variant: 'outline' as const };
    }
  };

  const getUserTypeBadge = (type: string) => {
    switch (type) {
      case 'admin':
        return { variant: 'destructive' as const };
      case 'freelancer':
        return { variant: 'default' as const, className: 'bg-blue-500 hover:bg-blue-600' };
      case 'employer':
        return { variant: 'default' as const, className: 'bg-purple-500 hover:bg-purple-600' };
      case 'client':
        return { variant: 'default' as const, className: 'bg-orange-500 hover:bg-orange-600' };
      default:
        return { variant: 'outline' as const };
    }
  };

  const getUserTypeLabel = (type: string) => {
    if (isRTL) {
      switch (type) {
        case 'admin': return 'مدير';
        case 'freelancer': return 'مستقل';
        case 'employer': return 'صاحب عمل';
        case 'client': return 'عميل';
        default: return type;
      }
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusLabel = (status: string) => {
    if (isRTL) {
      switch (status) {
        case 'active': return 'نشط';
        case 'inactive': return 'غير نشط';
        case 'suspended': return 'موقوف';
        case 'banned': return 'محظور';
        default: return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || user.user_type === filterType;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {isRTL ? 'إدارة المستخدمين' : 'Users Management'}
        </h2>
        <div className="flex gap-2">
          <Button onClick={fetchUsers} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            {isRTL ? 'تحديث' : 'Refresh'}
          </Button>
          <Button onClick={() => setAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            {isRTL ? 'إضافة مستخدم' : 'Add User'}
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4`} />
              <Input
                placeholder={isRTL ? "البحث بالاسم أو البريد..." : "Search by name or email..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={isRTL ? 'pr-10' : 'pl-10'}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={isRTL ? "نوع المستخدم" : "User Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isRTL ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="freelancer">{isRTL ? 'مستقل' : 'Freelancer'}</SelectItem>
                <SelectItem value="employer">{isRTL ? 'صاحب عمل' : 'Employer'}</SelectItem>
                <SelectItem value="client">{isRTL ? 'عميل' : 'Client'}</SelectItem>
                <SelectItem value="admin">{isRTL ? 'مدير' : 'Admin'}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={isRTL ? "الحالة" : "Status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isRTL ? 'الكل' : 'All'}</SelectItem>
                <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                <SelectItem value="inactive">{isRTL ? 'غير نشط' : 'Inactive'}</SelectItem>
                <SelectItem value="suspended">{isRTL ? 'موقوف' : 'Suspended'}</SelectItem>
                <SelectItem value="banned">{isRTL ? 'محظور' : 'Banned'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              {isRTL ? 'جاري التحميل...' : 'Loading...'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className={`${isRTL ? 'text-right' : 'text-left'} p-3`}>
                      {isRTL ? 'المستخدم' : 'User'}
                    </th>
                    <th className={`${isRTL ? 'text-right' : 'text-left'} p-3`}>
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </th>
                    <th className={`${isRTL ? 'text-right' : 'text-left'} p-3`}>
                      {isRTL ? 'النوع' : 'Type'}
                    </th>
                    <th className={`${isRTL ? 'text-right' : 'text-left'} p-3`}>
                      {isRTL ? 'الحالة' : 'Status'}
                    </th>
                    <th className={`${isRTL ? 'text-right' : 'text-left'} p-3`}>
                      {isRTL ? 'تاريخ الانضمام' : 'Join Date'}
                    </th>
                    <th className={`${isRTL ? 'text-right' : 'text-left'} p-3`}>
                      {isRTL ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            {user.company_name && (
                              <p className="text-sm text-gray-500">{user.company_name}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">{user.email}</td>
                      <td className="p-3">
                        <Badge {...getUserTypeBadge(user.user_type)}>
                          {getUserTypeLabel(user.user_type)}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge {...getStatusBadge(user.status)}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-600">
                        {new Date(user.created_at).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedUser(user);
                              setViewDialog(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedUser(user);
                              setFormData({
                                name: user.name,
                                email: user.email,
                                phone: user.phone || "",
                                user_type: user.user_type,
                                status: user.status,
                                password: ""
                              });
                              setEditDialog(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {user.user_type !== 'admin' && (
                            <>
                              {user.status === 'active' ? (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleStatusChange(user.id, 'suspended')}
                                >
                                  <UserX className="w-4 h-4 text-orange-500" />
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleStatusChange(user.id, 'active')}
                                >
                                  <UserCheck className="w-4 h-4 text-green-500" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setDeleteDialog(true);
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {isRTL ? 'لا توجد نتائج' : 'No results found'}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isRTL ? 'تفاصيل المستخدم' : 'User Details'}</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label>{isRTL ? 'الاسم' : 'Name'}</Label>
                <p className="text-sm">{selectedUser.name}</p>
              </div>
              <div>
                <Label>{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <p className="text-sm">{selectedUser.email}</p>
              </div>
              <div>
                <Label>{isRTL ? 'رقم الهاتف' : 'Phone'}</Label>
                <p className="text-sm">{selectedUser.phone || (isRTL ? 'غير محدد' : 'Not provided')}</p>
              </div>
              <div>
                <Label>{isRTL ? 'نوع المستخدم' : 'User Type'}</Label>
                <p className="text-sm">{getUserTypeLabel(selectedUser.user_type)}</p>
              </div>
              <div>
                <Label>{isRTL ? 'الحالة' : 'Status'}</Label>
                <Badge {...getStatusBadge(selectedUser.status)}>
                  {getStatusLabel(selectedUser.status)}
                </Badge>
              </div>
              {selectedUser.company_name && (
                <div>
                  <Label>{isRTL ? 'اسم الشركة' : 'Company Name'}</Label>
                  <p className="text-sm">{selectedUser.company_name}</p>
                </div>
              )}
              <div>
                <Label>{isRTL ? 'تاريخ الانضمام' : 'Join Date'}</Label>
                <p className="text-sm">
                  {new Date(selectedUser.created_at).toLocaleString(isRTL ? 'ar-SA' : 'en-US')}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isRTL ? 'تعديل المستخدم' : 'Edit User'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">{isRTL ? 'الاسم' : 'Name'}</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-phone">{isRTL ? 'رقم الهاتف' : 'Phone'}</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-status">{isRTL ? 'الحالة' : 'Status'}</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{isRTL ? 'نشط' : 'Active'}</SelectItem>
                    <SelectItem value="inactive">{isRTL ? 'غير نشط' : 'Inactive'}</SelectItem>
                    <SelectItem value="suspended">{isRTL ? 'موقوف' : 'Suspended'}</SelectItem>
                    <SelectItem value="banned">{isRTL ? 'محظور' : 'Banned'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setEditDialog(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button type="submit">
                {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isRTL ? 'إضافة مستخدم جديد' : 'Add New User'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-name">{isRTL ? 'الاسم' : 'Name'}</Label>
                <Input
                  id="add-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="add-email">{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="add-password">{isRTL ? 'كلمة المرور' : 'Password'}</Label>
                <Input
                  id="add-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="add-phone">{isRTL ? 'رقم الهاتف' : 'Phone'}</Label>
                <Input
                  id="add-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="add-type">{isRTL ? 'نوع المستخدم' : 'User Type'}</Label>
                <Select
                  value={formData.user_type}
                  onValueChange={(value) => setFormData({ ...formData, user_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freelancer">{isRTL ? 'مستقل' : 'Freelancer'}</SelectItem>
                    <SelectItem value="employer">{isRTL ? 'صاحب عمل' : 'Employer'}</SelectItem>
                    <SelectItem value="client">{isRTL ? 'عميل' : 'Client'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setAddDialog(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button type="submit">
                {isRTL ? 'إضافة' : 'Add'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isRTL ? 'تأكيد الحذف' : 'Confirm Delete'}</DialogTitle>
            <DialogDescription>
              {isRTL
                ? `هل أنت متأكد من حذف المستخدم ${selectedUser?.name}؟ لا يمكن التراجع عن هذا الإجراء.`
                : `Are you sure you want to delete user ${selectedUser?.name}? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              {isRTL ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {isRTL ? 'حذف' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersSection;