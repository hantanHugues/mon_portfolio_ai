import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="space-y-8 animate-in max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Paramètres</h1>
        <p className="text-muted-foreground text-lg">
          Configurez votre profil et vos préférences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du profil</CardTitle>
          <CardDescription>
            Ces informations seront affichées sur votre portfolio public
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input id="name" placeholder="Votre nom" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Titre professionnel</Label>
            <Input id="title" placeholder="Ex: Développeur Full-Stack" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Parlez de vous..."
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="votre@email.com" />
          </div>
          <Button>Enregistrer les modifications</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Réseaux sociaux</CardTitle>
          <CardDescription>Ajoutez vos liens de réseaux sociaux</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input id="github" placeholder="https://github.com/username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" placeholder="https://twitter.com/username" />
          </div>
          <Button>Enregistrer les liens</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préférences</CardTitle>
          <CardDescription>Personnalisez votre expérience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevez des notifications lorsque quelqu'un consulte votre portfolio
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Portfolio public</Label>
              <p className="text-sm text-muted-foreground">
                Rendre votre portfolio accessible à tous
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
