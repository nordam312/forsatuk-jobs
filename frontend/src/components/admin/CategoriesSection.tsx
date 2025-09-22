import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategoriesSectionProps {
  isRTL: boolean;
}

const CategoriesSection = ({ isRTL }: CategoriesSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {isRTL ? 'إدارة التصنيفات' : 'Categories Management'}
        </h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {isRTL ? 'إضافة تصنيف' : 'Add Category'}
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600">
            {isRTL ? 'قسم إدارة التصنيفات قيد التطوير...' : 'Categories management section under development...'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesSection;